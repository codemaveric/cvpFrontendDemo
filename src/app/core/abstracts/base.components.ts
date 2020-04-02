export abstract class BaseComponent {
    public isGrinding = false;
    public errorMessage;

    constructor() {
    }

    protected setLoading(isLoading = true) {
        this.isGrinding = isLoading;
        // isLoading ? this.uiActions.load() : this.uiActions.loadDone();
    }

    protected setLoadingDone() {
        this.setLoading(false);
    }

    protected notifyError(err) {
        this.setLoading(false);
        this.errorMessage = err.message;
        // this.uiActions.loadError(err.message);
    }
}
