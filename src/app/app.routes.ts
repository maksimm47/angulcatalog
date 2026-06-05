import { Routes } from '@angular/router';
import { CatalogPage } from './pages/catalog-page/catalog-page';
import { Layout } from './common-ui/layout/layout';

export const routes: Routes = [
    {path: '', component: Layout, children: [
            {path: '', component: CatalogPage}
    ]}
];
