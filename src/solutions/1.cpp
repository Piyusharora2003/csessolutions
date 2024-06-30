#include <bits/stdc++.h>
using namespace std;

// n even -> n = n/2
// n odd -> n = 3n + 1

int main() {
    long long int n ; 
    cin >> n ;
    while (n != 1) {
        cout << n << " ";
        if ( n&1 ) {
            n = 3 * n + 1;
        } else {
            n = n / 2;
        }
    }
    cout << 1 << "\n";
}
