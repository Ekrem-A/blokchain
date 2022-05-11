
const SHA256 = require('crypto-js/sha256');

//sha 256 algoritması javascript kütüphanesinde default olrak bulunmadığından,
//npm install yardımıyla kütüphaneye eklendi

class blokchain1{
    constructor(index,timestep,data,previoushash= '',){
        this.index=index;
        this.timestep=timestep;
        this.data=data;
        this.previoushash=previoushash;
        this.hash=this.HASH();
        
    }
    
    
    HASH(){
        return SHA256 (this.index+this.timestep+JSON.stringify(this.data)).toString();

   }
}


class blokchain{
    constructor(){
        this.chain=[this.ilkblok()];
    }
    
    
    //ilkbloğun bilgileri
    ilkblok(){
        return new blokchain1(0,"30/03/2000",{deger:100},"0",);
    }
    
    
    //zincirin son bloğu
    sonblok(){
        return this.chain[this.chain.length-1];
    }
    
    
    //blok ekleme
    blokekle(yeniblok){
        yeniblok.previoushash=this.sonblok().hash;
        yeniblok.hash = yeniblok.HASH();
        this.chain.push(yeniblok);
 
    }
    
    
    //zincirin içerisindeki değerlerin kontrolünün doğruluğu
    kontrol(){
        for(var i =1; i<this.chain.length ; i++){
        var blok =this.chain[i];
        var previoushash= this.chain[i-1];
        
        if(blok.hash !== blok.HASH()){
            return false;
        }

        if(blok.previoushash !== previoushash.hash){
            return false;
        }
        return true;
    }
    }

     

}
var eko =new blokchain();
eko.blokekle(new blokchain1(1,"31/03/2001",{deger:8}));
eko.blokekle(new blokchain1(2,"20/03/2001",{deger:62}));

console.log(JSON.stringify(eko,null,8));

//değer değiştirilip zincirin doğruluğu tespit ediliyor
eko.chain[1].data={deger :50};
console.log("blokzinciri doğru mu?  " + eko.kontrol());
