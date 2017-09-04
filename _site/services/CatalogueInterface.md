
## Resource Path

Note: the specification of the structure of the resource path was frozen on 2015-20-13 (see https://github.com/reTHINK-project/architecture/issues/62).  Any further changes need to maintain
100% backward compatibility.


    <resource-path>  ::=  <hostname> "/.well-known/" <resource-type> "/" <resource-type-id>

    <hostname>  ::= "localhost"  |  <csp-domain>
    <csp-domain>  ::=   [ <url-string> "." ]  <url-string> "." <top-level-domain>
    <top-level-domain>  ::=  "de" | "com" | "org" | "fr" | "eu"
    <resource-type> ::= "protocolstub"  |  "hyperty" 
    <resource-type-id>  ::= "default"  | <identifier>
    <identifier>  ::= <url-string>
    <url-string> ::= <url-char> ...
    <url-char>  ::= <lower-case-char> | <upper-case-char> | <digit> | "_" | "-"
    <lower-case-char> ::= "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j" 
                                | "k" | "l" | "m" | "n" | "o" | "p" | "q" | "r" | "s" 
                                | "t" | "u" | "v" | "w" | "x" | "y" | "z"
    <upper-case-char> ::= "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "I" | "J" 
                                | "K" | "L" | "M" | "N" | "O" | "P" | "Q" | "R" | "S" 
                                | "T" | "U" | "V" | "W" | "X" | "Y" | "Z"
    <digit>  ::=   "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" 

Example:

    catalogue.rethink.eu/.well-known/protocolstub/myAwesome_protocol-stub9

    localhost/.well-known/protocolstub/myAwesome_protocol-stub9

References:
    [Routing Backus-Naur Form (RBNF): A Syntax Used to Form Encoding Rules in Various Routing Protocol Specifications](http://tools.ietf.org/html/rfc5511)
    
ToDos:

    We need to complete the spec for top-level-domains to be formerly complete

