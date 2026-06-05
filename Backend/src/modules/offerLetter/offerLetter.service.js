import { OfferLetter, Application, User, JobPost, Company } from '../../models/initModels.js';
import { sendEmail } from '../../shared/utils/email.js';

export const sendOfferLetter = async (applicationId, hrId, data) => {
  const application = await Application.findByPk(applicationId, {
    include: [
      { model: User, as: 'jobSeeker' },
      { model: JobPost, include: [Company] }
    ]
  });
  if (!application) throw new Error('Application not found');
  if (application.status !== 'ADMIN_VERIFIED' && application.status !== 'OFFER_LETTER_SENT') {
    throw new Error('Application not verified by admin');
  }

  let offerLetter = await OfferLetter.findOne({ where: { applicationId } });
  if (offerLetter) {
    offerLetter = await offerLetter.update({
      offerLetterUrl: data.offerLetterUrl,
      sentDate: new Date()
    });
  } else {
    offerLetter = await OfferLetter.create({
      applicationId,
      hrId,
      offerLetterUrl: data.offerLetterUrl,
      status: 'SENT',
      sentDate: new Date()
    });
  }

  if (application.status !== 'OFFER_LETTER_SENT') {
    await application.update({ status: 'OFFER_LETTER_SENT' });
  }

  // Send Email Notification
  try {
    const candidateEmail = application.jobSeeker.email;
    const candidateName = application.jobSeeker.name;
    const jobTitle = application.JobPost.title;
    const companyName = application.JobPost.Company.companyName;

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 12px;">
        <h2 style="color: #F97316; margin-bottom: 5px;">Congratulations ${candidateName}!</h2>
        <p style="font-size: 16px; margin-top: 0;">We are thrilled to offer you the position of <strong>${jobTitle}</strong> at <strong>${companyName}</strong>.</p>
        <p>After a rigorous interview process and final verification, our team was highly impressed by your skills and background.</p>
        <p>Please find your official Offer Letter document via the secure link below:</p>
        <div style="margin: 30px 0; text-align: center;">
          <a href="${data.offerLetterUrl}" style="background-color: #F97316; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">View Offer Letter</a>
        </div>
        <p>If you have any questions or concerns regarding the offer, please reach out to our HR department immediately.</p>
        <p>We are excited to welcome you aboard!</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="color: #64748b; font-size: 12px; margin: 0;">Best regards,<br>${companyName} HR Team</p>
      </div>
    `;

    await sendEmail(
      candidateEmail, 
      `Job Offer: ${jobTitle} at ${companyName}`, 
      `Congratulations! View your offer letter here: ${data.offerLetterUrl}`, 
      htmlContent
    );
  } catch (error) {
    console.error("Failed to send offer letter email:", error);
  }

  return offerLetter;
};

export const getOfferLetter = async (applicationId) => {
  const offerLetter = await OfferLetter.findOne({ where: { applicationId } });
  if (!offerLetter) throw new Error('Offer letter not found');
  return offerLetter;
};
