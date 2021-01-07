const { poolPromise } = require('../config/db')



    function getRandomNumber(min, max){
        let distance = max - min + 1;
        let numRan = Math.floor(Math.random() * distance) + min;
  
        return numRan;
    }

    function createArrayofNumber(start, end){

        let array = [];

        for (var i = start; i <= end; i = i + 1){
            array.push(i);
        }

        return array
    }



    function getRandomMatch(n){

        let array;
        let res = [];
        if (n > 4){
            array = createArrayofNumber(1, n); 
        }

        //dam bao so nguoi choi la luy thua 2
        obigateLen = Math.pow(2, Math.ceil(Math.log2(n)));
        
        var numEmpty = obigateLen - 4;
        //Khoi tao mang ket qua
        for (var i = 0; i < obigateLen; i = i + 1){
            res.push(-1);
        }

        res[0] = 1;
        res[obigateLen - 1] = 2;
        res[Math.floor((obigateLen - 1) / 2)] = 3;
        res[Math.floor((obigateLen - 1) /2) - 1] = 4;

        
        //so luong hat giong con lai
        
        var count = 4;
        var levelSeed = 3;
        
        //console.log(array);

        while (array.length > 4){

            var idMinSeed = Math.pow(2, levelSeed - 1);
            var idMaxSeed = Math.pow(2, levelSeed);
        
            idMaxSeed = ( idMaxSeed < n) ? idMaxSeed: n;

            count -=1;
            //if (count == 0)
            //break;
            //Khoang cach giua 2 bac seed Vd 5-8 9-16
            var distanceSeed = idMaxSeed - idMinSeed;
            
            while (distanceSeed > 0){
            let randomIndex = getRandomNumber(4, 4 + distanceSeed - 1);
            var randomSeed = getRandomNumber(0, numEmpty - 1);
            
            let randomNumber = array[randomIndex]; 

            
            for (var i = 0; i < res.length; i+= 1){

                if (res[i] != -1){
                continue;
                }

                if (randomSeed == 0){
                res[i] = randomNumber;
                
                break;
                }

                if (res[i] == -1){
                randomSeed -= 1;
                }
            }
            
            
            array.splice(randomIndex, 1);
            distanceSeed -= 1
            numEmpty -= 1;
            }
            
            levelSeed += 1;
        }
        
    

        return res;
    }

    
