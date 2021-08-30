import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListComponent } from '../admin-list/admin-list.component';
import { AdminPanelComponent } from '../admin-panel/admin-panel.component';
import { PlaceOrdersComponent } from '../place-orders/place-orders.component';

const routes: Routes = [

    {
        path: '', component: AdminPanelComponent,
        children: [

            {
                path: 'product',
                loadChildren: () => import('../product/product.module').then(m => m.ProductModule)
            },
            {
                path: 'user',
                loadChildren: () => import('../user/user.module').then(m => m.UserModule)
            },
            {
                path: "", redirectTo: "adminList", pathMatch: "full"
            },
            {
                path: "adminList", component: AdminListComponent,
            },

            {
                path: "placeOrders", component: PlaceOrdersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }
