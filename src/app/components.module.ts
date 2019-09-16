import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NavComponent } from './nav/nav.component';


@NgModule({
    declarations: [
        NavComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule
    ],
    exports: [
        NavComponent
    ]
})

export class ComponentsModule { }