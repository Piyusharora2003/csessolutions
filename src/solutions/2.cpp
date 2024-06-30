#include <bits/stdc++.h>
using namespace std;

// WE are given that there lies a missing number from 1 to n
// We have to find that missing number

// We know x ^ x  = 0 and x ^ 0 = x
// from this we can say that if we XOR all the numbers from 1 to n and then XOR all the given numbers then we will get the missing number
// for the testcase n = 5 , nums =  2 3 1 5 : (1 ^ 2 ^ 3 ^ 4 ^ 5) ^ (2 ^ 3 ^ 1 ^ 5) = 4


int main () {
    int n;
    cin >> n;
    int XORALL = n ;
    for ( int i = 0 ; i  < n - 1 ; i++ ) {
        int x;
        cin >> x;
        XORALL ^= ( x ^ ( i + 1 ) );
    } 
    cout<< XORALL << "\n";
}