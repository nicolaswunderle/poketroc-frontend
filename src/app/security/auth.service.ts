import { Injectable } from '@angular/core';
import { Observable, ReplaySubject, filter, map, from, delayWhen } from "rxjs";
import { AuthResponse } from "./auth-response.model";
import { HttpClient } from "@angular/common/http";
import { Dresseur } from "./dresseur.model";
import { AuthRequest } from "./auth-request.model";
import { Storage } from "@ionic/storage-angular";
import { environment } from "src/environments/environment";

/**
 * Authentication service for login/logout.
 */
@Injectable({ providedIn: "root" })
export class AuthService {
  #auth$: ReplaySubject<AuthResponse | undefined>;

  constructor(private http: HttpClient, private readonly storage: Storage) {
    this.#auth$ = new ReplaySubject(1);
    this.storage.get('auth').then((auth) => {
    // Emit the loaded value into the observable stream.
    this.#auth$.next(auth);
  });
  }

  /**
   * @returns An `Observable` that will emit a `boolean` value
   * indicating whether the current user is authenticated.
   * This `Observable` will never complete and must be unsubscribed for when not needed.
   */
  isAuthenticated$(): Observable<boolean> {
    return this.#auth$.pipe(map((auth) => Boolean(auth)));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated `User` object only if there
   * currently is an authenticated user.
   */
  getUser$(): Observable<Dresseur | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.dresseur));
  }

  /**
   * @returns An `Observable` that will emit the currently authenticated user's `token`, only if there
   * currently is an authenticated user.
   */
  getToken$(): Observable<string | undefined> {
    return this.#auth$.pipe(map((auth) => auth?.token));
  }

  /**
   * Sends an authentication request to the backend API in order to log in a user with the
   * provided `authRequest` object.
   *
   * @param authRequest An object containing the authentication request params
   * @returns An `Observable` that will emit the logged in `User` object on success.
   */
  logIn$(authRequest: AuthRequest): Observable<Dresseur> {
    const authUrl = `${environment.apiUrl}/dresseurs/connexion`;
    return this.http.post<AuthResponse>(authUrl, authRequest).pipe(
      // Delay the observable stream while persisting the authentication response.
      delayWhen(auth => this.#saveAuth$(auth)),
      map((auth) => {
        this.#auth$.next(auth);
        console.log(`Le dresseur ${auth.dresseur.pseudo} est connecté`);
        return auth.dresseur;
      })
    );
  }

  /**
   * Logs out the current user.
   */
  logOut(): void {
    this.#auth$.next(undefined);
    // Remove the stored authentication from storage when logging out.
    this.storage.remove('auth');
    console.log("Le dresseur est déconnecté");
  }
  /**
   * Persists the provided `AuthResponse` to the storage.
   *
   * @param auth The AuthResponse to persist
   * @returns An `Observable` that will emit when the authentication is persisted
   */
  #saveAuth$(auth: AuthResponse): Observable<void> {
    return from(this.storage.set("auth", auth));
  }
}
