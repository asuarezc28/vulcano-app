import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppUrls } from 'src/app/config/app-urls.config';
import { WalkingTrailsDetailComponent } from './walking-trails-detail/walking-trails-detail.component';
import { WalkingTrailsComponent } from './walking-trails/walking-trails.component';

const routes: Routes = [
    {
        path: AppUrls.AppWalkingTrailsRoot,
        component: WalkingTrailsComponent
    },
    // { path: AppUrls.AppWalkingTrailsRoot, redirectTo: AppUrls.AppWalkingTrails, pathMatch: 'full' },
    // {
    //     path: AppUrls.AppWalkingTrails, component: WalkingTrailsComponent, children: [
    //     { path: AppUrls.AppWalkingTrailsDetail, component: WalkingTrailsDetailComponent },
    //     ]
    // },
    // { path: AppUrls.AppWalkingTrails, component: WalkingTrailsComponent },
    { path: AppUrls.AppWalkingTrailsDetail, component: WalkingTrailsDetailComponent },
];




// const routes: Routes = [
//     { path: AppURl.AppFormBackgroundShopsRoot, redirectTo: AppURl.AppFormBackgroundShops, pathMatch: 'full' },
//     {
//       path: AppURl.AppFormBackgroundShops, component: BackgroundPageComponent, children: [
//         { path: AppURl.AppFormShops, component: FormsShopsPageComponent },
//         { path: AppURl.AppShopList, component: ShopsListPageComponent },
//         { path: AppURl.AppShopMap, component: EsriMapComponent },
//       ]
//     },
//     { path: AppURl.AppShopDetail, component: ShopDetailPageComponent },
//   ]



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class WalkingTrailsRoutingModule { }
