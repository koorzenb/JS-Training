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
    btnWalk: startWalking + set Status(green)
    btnStop: stopWalking + set Status(red)

}

\_createPerson(){

    new Person (name,lastname,age)
    disable btnCreate + Inputs
    enable Walk/Stop person

}