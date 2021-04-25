import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { GameComponent } from "../chess/game/game.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { ChessModule } from "../chess/chess.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { EditorModule } from "../editor/editor.module";
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChessModule,
    BrowserAnimationsModule,
    DragDropModule,
    EditorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
