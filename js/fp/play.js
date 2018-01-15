/**
 *  Functional Playground
 *  @author trewbot <trewbot@phene.co>
 *  2018.01.13
 */

const
    /**
     *  Check if number is prime
     *  @param {number} n - Number to check
     *  @returns {boolean} If n is prime
     */
    primality=n=>{
        if(isNaN(n)||!isFinite(n)||n%1||n<2)return !1
        if(n%2==0)return(n==2)
        for(let i=3,m=n**.5;i<=m;i+=2)if(n%i==0)return !1
        return !0
    }
