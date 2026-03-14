export class ServiceError extends Error {
  constructor({ cause, message, action }) {
    super(message || "Serviço indisponível no momento.", {
      cause,
      action,
    });

    this.name = "ServiceError";
    this.action = action || "Verifique se o serviço está disponível.";
    this.statusCode = 503;
  }

  toJSON() {
    return {
      name: this.name,
      message: this.message,
      action: this.action,
      status_code: this.statusCode,
    };
  }
}
