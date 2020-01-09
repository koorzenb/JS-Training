export class ViewModel {
        get statusElement() {
                if (this._statusElement == null) {
                        this._statusElement = document.querySelector('#status');
                }
                return this._statusElement;
        }

        set statusElement(newValue) {
                this._statusElement = newValue;
        }

        get requiredElements() {
                if (this._requiredElements == null) {
                        this._requiredElements = document.querySelectorAll('[required]');
                }
                return this._requiredElements;
        }

        set requiredElements(newValue) {
                this._requiredElements = newValue;
        }

        get btnCreatePerson() {
                if (this._btnCreatePerson == null) {
                        this._btnCreatePerson = document.querySelector('#btnCreatePerson');
                }
                return this._btnCreatePerson;
        }

        set btnCreatePerson(newValue) {
                this._btnCreatePerson = newValue;
        }

        get btnWalkPerson() {
                if (this._btnWalkPerson == null) {
                        this._btnWalkPerson = document.querySelector('#btnWalkPerson');
                }
                return this._btnWalkPerson;
        }

        set btnWalkPerson(newValue) {
                this.btnWalkPerson = newValue;
        }

        get btnStopPerson() {
                if (this._btnStopPerson == null) {
                        this._btnStopPerson = document.querySelector('#btnStopPerson');
                }
                return this._btnStopPerson;
        }

        set btnStopPerson(newValue) {
                this._btnStopPerson = newValue;
        }

        constructor() {
                this.clickHandle = this._click.bind(this);
                this.keyupHandle = this._keyup.bind(this);
                console.log(this.statusElement);
        }

        dispose() {
                this.clickHandle = null;
                this.keyupHandle = null;
                this.statusElement = null;
                this.requiredElements = null;
                this.btnCreatePerson = null;
                this.btnWalkPerson = null;
                this.btnStopPerson = null;
        }

        _click(event) {}

        _keyup(event) {}
}
