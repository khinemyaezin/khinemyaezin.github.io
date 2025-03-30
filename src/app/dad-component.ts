import { Directive, OnDestroy, Renderer2 } from "@angular/core";
import { Subject } from "rxjs";
import { ScrollEmitterDirective } from "./directive/scroll-emitter.directive";

@Directive({
    selector: '[appDad]', // Add a selector if needed
})
export abstract class DadComponent implements OnDestroy {
    protected destroy$ = new Subject<void>();

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}