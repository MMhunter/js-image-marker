export abstract class JMEvent {

    /**
     * name of the event
     */
    public readonly name: string;

    public readonly originalEvent: Event;

    protected propagation: boolean = true;

    constructor(name: string, event: Event) {
        this.name = name;
        this.originalEvent = event;
    }

    public stopPropagation(): void {
        this.propagation = false;
    }

    public isPropagationStopped(): boolean {
        return !this.propagation;
    }

}