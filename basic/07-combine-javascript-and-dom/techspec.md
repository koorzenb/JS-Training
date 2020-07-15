# HTML

Inputs (required + class=input): First, last, age

Buttons(disabled): Create, Walk, Stop

div: Status

# Classes

## Helper

validateInputs(){

    EvList: keyup inputValues != null
    Enable btnCreate

}

## Main

\_click(){

    btnCreate: createPerson()
    btnWalk: startWalkingAction
    btnStop: stopWalking

}

\_createPerson(){

    new Person (name,lastname,age)
    disable btnCreate + Inputs
    enable btnWalk/btnStop

}

\_startPerson() {
person.startWalking() + set Status(+green) + div.status = walking
}

\_stopPerson() {
person.stopWalking() + set Status(+red) + div.status = idle
}

dispose() {
EvList (first), then handlers
}
