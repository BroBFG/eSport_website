namespace eSport_website
{
    public class ErrorMiddleware
    {
        private readonly RequestDelegate _next;
        public ErrorMiddleware(RequestDelegate next)
        {
            _next = next;
        }
        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next.Invoke(context);
            }
            catch (Exception e)
            {
                //logger.LogError("Исключение: {message}; Метод: {target}", e.Message, e.TargetSite);
            }
        }
    }
}
