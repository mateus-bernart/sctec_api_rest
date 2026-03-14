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

export class ValidationError extends Error {
  constructor({ cause, message, action }) {
    super(message, {
      cause,
      action,
    });

    this.name = "ValidationError";
    this.action = action || "Verifique as informações inseridas.";
    this.statusCode = 400;
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

export class ForbiddenError extends Error {
  constructor({ cause, message, action }) {
    super(
      message || "Usuário não autenticado.",
      {
        cause,
      },
      action,
    );

    this.name = "ForbiddenError";
    this.action =
      action || "Verifique as features necessárias antes de continuar.";
    this.statusCode = 403;
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
