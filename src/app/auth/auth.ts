import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';


export type SafeUser = Omit<User, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/users`

  private currentUserSubject = new BehaviorSubject<SafeUser | null>(
    this.loadUserFromStorage()
  );

  public currentUser$: Observable<SafeUser | null> = this.currentUserSubject.asObservable();

  private handleAuthSuccess(user: User): SafeUser {
    const { password: _, ...safeUser } = user;
    localStorage.setItem('currentUser', JSON.stringify(safeUser));
    this.currentUserSubject.next(safeUser);
    return safeUser;
  }

  constructor(private http: HttpClient) { }

  private loadUserFromStorage(): SafeUser | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  login(email: string, password: string): Observable<SafeUser> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (!user) {
          throw new Error('Неверные данные')
        }
        return this.handleAuthSuccess(user)
      })
    );
  };

  register(email: string, password: string, name: string): Observable<SafeUser> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      switchMap(users => {
        const uniqueEmail = users.find(u => u.email === email);
        if (uniqueEmail) {
          throw new Error('Пользователь с такой почтой уже существует.');
        }
        return this.http.post<User>(this.apiUrl, {email, password, name, role: 'user' }).pipe(
          map(newUser => this.handleAuthSuccess(newUser))
        );
      })
    );
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
