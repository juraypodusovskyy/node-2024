class ApiError extends Error {
  public status: number;

  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export { ApiError };
