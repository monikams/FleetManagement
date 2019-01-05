namespace Infrastructure.Helpers
{
    using System.Net;
    using System.Net.Mail;
    using System.Threading.Tasks;

    public class MailHelper
    {
        public static async Task SendEmail(string recipients, string subject, string body)
        {
            var userName = "fleet.management.official@gmail.com";
            var password = "++!Fl$$t.M@n@gm$nt!";

            var credentials = new NetworkCredential(userName, password);
            var client = new SmtpClient("smtp.gmail.com", 587)
                             {
                                 Credentials = credentials,
                                 EnableSsl = true
                             };

            var mailMessage = new MailMessage(userName, recipients, subject, body);
            await client.SendMailAsync(mailMessage);
        }
    }
}