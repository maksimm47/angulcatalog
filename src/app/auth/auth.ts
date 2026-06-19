import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { BehaviorSubject, map, Observable } from 'rxjs';


export type SafeUser = Omit<User, 'password'>;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/users'
  
  private currentUserSubject = new BehaviorSubject<SafeUser | null>(
    this.loadUserFromStorage()
  );
  public currentUser$: Observable<SafeUser | null> =
    this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  private loadUserFromStorage(): SafeUser | null {
    const stored = localStorage.getItem('currentUser');
    return stored ? JSON.parse(stored) : null;
  }

  login(email: string, password: string): Observable<SafeUser> {
    return this.http.get<User[]>(this.apiUrl).pipe(
      map(users =>{
        if (users.length === 0) throw new Error('Неверные данные');

        const user = users.find(u => u.email === email && u.password === password);

        if (!user) throw new Error('Неверные данные')
        
        const {password: _, ...safeUser} = user;
        localStorage.setItem('currentUser', JSON.stringify(safeUser));
        this.currentUserSubject.next(safeUser);
        return safeUser;
      })
    );
  };
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
