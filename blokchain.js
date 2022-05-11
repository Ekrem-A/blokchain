const SHA256= require ('crypto-js/sha256');

class blokchain1{
    constructor(index,timestep,data,previoushash= ''){
        this.index=index;
        this.timestep=timestep;
        this.data=data;
        this.previoushash=previoushash;
        this.hash='';
        
    }
    Hashing(){
        return SHA256 (this.index+this.timestep+JSON.stringify(this.data)+this.previoushash).toString;

    }


}