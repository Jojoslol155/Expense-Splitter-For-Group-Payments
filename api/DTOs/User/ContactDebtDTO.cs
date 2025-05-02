namespace api.DTOs.User
{
    public class ContactDebtDTO
    {
        public int ContactId { get; set; }
        public string ContactName { get; set; } = string.Empty;
        public decimal AmountOwedToYou { get; set; }
        public decimal AmountYouOwe { get; set; }
    }
}