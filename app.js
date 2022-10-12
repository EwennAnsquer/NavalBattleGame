let findBoatPart=0;
let tries=0;
let sensBoatAll=[];
let positionBoat=[]
let temporaryPositionBoat=[];
let boatFind=[[],[],[],[],[]];
let boatReady=0;
let mistakeBoat=false;
let boatIdFind;
const BOATIMG = [...document.querySelectorAll('.res img')]
const EXPLOSION = document.querySelector('#explosion')
const restartButton = document.querySelector('#restartButton')
const quitButton = document.querySelector('#quitButton')

document.addEventListener('DOMContentLoaded', async function() {
    await sensBoat();
    // console.log("les sens des bateaux est:"+sensBoatAll);
    await placeBoat(0,sensBoatAll[0],5)
    do {
        if(mistakeBoat==true){
            resetBoat();
        }
        await placeBoat(1,sensBoatAll[1],4)
    } while (mistakeBoat==true);
    do {
        if(mistakeBoat==true){
            resetBoat();
        }
        await placeBoat(2,sensBoatAll[2],3)
    } while (mistakeBoat==true);
    do {
        if(mistakeBoat==true){
            resetBoat();
        }
        await placeBoat(3,sensBoatAll[3],3)
    } while (mistakeBoat==true);
    do {
        if(mistakeBoat==true){
            resetBoat();
        }
        await placeBoat(4,sensBoatAll[4],2)
    } while (mistakeBoat==true);
    // console.log('positionBoat=')
    // console.log(positionBoat)
    // console.log('temporaryPositionBoat=')
    // console.log(temporaryPositionBoat)
    // console.log('number of boatReady='+boatReady)
})

function resetBoat(){
    return new Promise((resolve) => {
        positionBoat.pop()
        boatReady=boatReady-1
        mistakeBoat=false;
    })
    resolve();
}

quitButton.addEventListener('click',()=>{
    window.close();
})

restartButton.addEventListener('click',()=>{
    location.reload();
})

function searchInBoatPosition(x,y){
    value=false;
    for(i=0;i!=positionBoat.length;i++){
        for(e=0;e!=positionBoat[i].length;e++){
            if(positionBoat[i][e][0]==x && positionBoat[i][e][1]==y){
                value=true;
                loadResult(i,x,y)
            }
        }
    }
    return value;
}

function loadResult(id,x,y){
    // console.log('boat '+id+' is touch in '+x+','+y);
    boatFind[id].push([x,y])
    if(boatFind[id].length==5-id || boatFind[id].length==id){
        placeExplosionCross(id)
        boatFind[id].push('complete')
    }
}
 
function doClick(id) {
    if(testState(id)==true && findBoatPart!=17){ //tester si la case a deja ete cliquer ou pas
        // console.log('clicked on #'+id);
        let xy = id.replace('tile-', '').split('-');
        let x=xy[0];
        let y=xy[1];
        if(searchInBoatPosition(x,y)==true){
            // console.log('tuche')
            document.querySelector('#'+id).classList.add('A');
            findBoatPart+=1;
        }else{
            // console.log('pas tuche')
            document.querySelector('#'+id).classList.add('B');
        }
        tries=tries+1;
        if(tries<=1){
            document.querySelector('#tries').innerHTML = `You have ${tries} try RN !`;
        }else{
            document.querySelector('#tries').innerHTML = `You have ${tries} tries RN !`;
        }
        if(findBoatPart==17){
            document.querySelector('#tries').innerHTML = `You MADE IT IN ${tries} tries GJ !`;
            document.querySelector('.restart p').innerHTML = `You MADE IT IN ${tries} tries GJ !`;
            document.querySelector('.restart').style.display='flex';
            setTimeout(() => {
                document.querySelector('.restart').style.opacity='1';
            }, 1);
        }
    }
}




function testState(id){
    let newCase=document.querySelector('#'+id);
    if(newCase.classList.contains('B') || newCase.classList.contains('A')){
        return false;
    }else{
        return true;
    }
}

function sensBoat(){
    return new Promise((resolve) => {
        for(let i=0;i<5;i++){
            sensBoatAll.push(Math.floor(4*Math.random()));//0= vers le haut, 1 vers la droite, 2 vers le bas et 3 vers la gauche
        }
        resolve();
    })
}

async function placeBoat(numberBoat,sensActualBoat,lenghtBoat){
    return new Promise(async (resolve) => {
        let row=CreateRowPlaceBoat(sensActualBoat,lenghtBoat);
        let col=CreateColPlaceBoat(sensActualBoat,lenghtBoat);
        ifPasstemporaryPosition(numberBoat,row,col)
        await continueBoat(row,col,lenghtBoat,sensActualBoat,numberBoat)
        if(temporaryPositionBoat.length!=0){
            await ifExist()
            positionBoat.push(temporaryPositionBoat)
            temporaryPositionBoat=[]
        }
        boatReady=boatReady+1;
        resolve();
    })
}

function CreateRowPlaceBoat(sensActualBoat,lenghtBoat){
    switch(sensActualBoat){
        case 0:
            return Math.floor(10*Math.random());
            break;
        case 1:
            return Math.floor((10-lenghtBoat)*Math.random());
            break;
        case 2:
            return Math.floor(10*Math.random());
            break;
        case 3:
            return lenghtBoat+Math.floor((10-lenghtBoat)*Math.random());
            break;
    }
}

function CreateColPlaceBoat(sensActualBoat,lenghtBoat){
    switch(sensActualBoat){
        case 0:
            return lenghtBoat+Math.floor((10-lenghtBoat)*Math.random());//sur la colonne
            break;
        case 1:
            return Math.floor(10*Math.random());//sur la ligne
            break;
        case 2:
            return Math.floor((10-lenghtBoat)*Math.random());//sur la colonne
            break;
        case 3:
            return Math.floor(10*Math.random());//sur la ligne
            break;
    }
}

function continueBoat(row,col,lenghtBoat,sensBoat,numberBoat){
    return new Promise((resolve) => {
        switch(sensBoat){
            case 0:
                for(i=0;i<lenghtBoat-1;i++){
                    col--;
                    ifPasstemporaryPosition(numberBoat,row,col)
                }
                break;
            case 1:
                for(i=0;i<lenghtBoat-1;i++){
                    row++;
                    ifPasstemporaryPosition(numberBoat,row,col)
                }
                break;
            case 2:
                for(i=0;i<lenghtBoat-1;i++){
                    col++;
                    ifPasstemporaryPosition(numberBoat,row,col)
                }
                break;
            case 3:
                for(i=0;i<lenghtBoat-1;i++){
                    row--;
                    ifPasstemporaryPosition(numberBoat,row,col)
                }
                break;
        }
        resolve();
    })
}

function ifPasstemporaryPosition(numberBoat,row,col){
    if(numberBoat==0){
        if(positionBoat.length==0){
            positionBoat.push([])
        }
        positionBoat[0].push([row,col]);
    }else{
        temporaryPositionBoat.push([row,col])
    }
}

function ifExist(){
    return new Promise(async (resolve) => {
        for(j=0;j!=boatReady;j++){
            for(k=0;k!=positionBoat[j].length;k++){
                for(i=0;i!=temporaryPositionBoat.length;i++){
                    if(positionBoat[j][k][0]==temporaryPositionBoat[i][0] && positionBoat[j][k][1]==temporaryPositionBoat[i][1]){
                        // console.log('pas cool ',temporaryPositionBoat[i][0],temporaryPositionBoat[i][1])
                        mistakeBoat=true;
                    }
                }
            }
        }
    resolve();
    })
}

function placeExplosionCross(id){
    let imgTop=BOATIMG[id].offsetTop
    let imgLeft=BOATIMG[id].offsetLeft
    let imgWidth=BOATIMG[id].offsetWidth
    let imgHeight=BOATIMG[id].offsetHeight
    let leftExplosion=imgLeft+imgWidth/2
    let topExplosion=imgTop+imgHeight/2
    EXPLOSION.style.left=leftExplosion+'px';
    EXPLOSION.style.top=topExplosion+'px';
    EXPLOSION.style.width=imgWidth*0.3+'px'
    EXPLOSION.style.display='block'
    setTimeout(() => {
        EXPLOSION.style.display='none'
        createCross(leftExplosion,topExplosion,imgWidth,imgHeight,id);
    }, 3000);  
}

function createCross(left,top,width,height,id){
    let img = document.createElement('img')
    img.setAttribute('src','img/cross.png')
    img.setAttribute('alt','cross')
    img.classList.add('cross')
    img.id='boat'+id
    document.querySelector('body').appendChild(img);
    document.querySelector('#boat'+id).style.top=top+height*0.1+'px';
    document.querySelector('#boat'+id).style.left=left+'px';
    document.querySelector('#boat'+id).style.width=width+'px';
    document.querySelector('#boat'+id).style.height=height+'px';
    document.querySelector('#boat'+id).style.display='block';
}

function numbersBoatFind(){
    let value;
    for(i=0;boatFind[i];i++){
        if(boatFind[i].includes('complete')){
            value=value+1;
        }
    }
    return value;
}
