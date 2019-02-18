import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';





@NgModule({
  declarations: [],
  imports: [MatButtonModule,MatToolbarModule,MatExpansionModule, MatInputModule,MatCardModule,MatProgressBarModule],
  exports: [MatButtonModule,MatToolbarModule,MatExpansionModule, MatInputModule,MatCardModule, MatProgressBarModule]
})
export class MaterialModule {}
 