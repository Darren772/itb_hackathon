from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    supabase_url: str
    supabase_service_role_key: str
    database_url: str
    gemini_api_key: str
    allowed_email_domain: str = "itb.ac.id"
    frontend_url: str = "http://localhost:3000"
    secret_key: str = "change-me"
    resend_api_key: str = ""

    class Config:
        env_file = ".env"
        case_sensitive = False


settings = Settings()
