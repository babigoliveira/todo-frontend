import {isBefore} from 'date-fns'

export class TokenManager {
  private token = ""
  private expiresIn = new Date()

  private get expired(): boolean {
    return isBefore(new Date(), this.expiresIn)
  }

  public async getToken(): Promise<string> {
    if (this.token && !this.expired) {
      return this.token
    }

    const data = await this.requestToken();

    this.token = data.token

    this.verifyToken()

    return this.token
  }

  private async requestToken() {
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/token`
    const res = await fetch(url, { method: "POST" });

    if (!res.ok) {
      throw new Error("Erro ao obter token");
    }

    return res.json()
  }

  private verifyToken() {
    if (!this.token) {
      throw new Error("Token inválido recebido");
    }
  }
}