import { Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { Layout } from './common-ui/layout/layout';
import { LoginPage } from './pages/login-page/login-page';
import { RegisterPage } from './pages/register-page/register-page';

export const routes: Routes = [
    {path: '', component: Layout, children: [
            {path: '', component: CatalogPage}
    ]},
    {path: 'login', component: LoginPage},
    {path: 'register', component: RegisterPage}
];
