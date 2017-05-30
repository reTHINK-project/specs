```c
<IfModule mod_ssl.c>
        <VirtualHost *:443>

                ##sub-domain name
                ServerName registry.hysmart.rethink.ptinovacao.pt

                SSLProxyCheckPeerCN off
                SSLProxyCheckPeerName off
    
                RewriteEngine On
                AllowEncodedSlashes On
    
                RewriteCond %{HTTP:Connection} Upgrade [NC]
                ##this ip should be equal of that you use on docker-compose conf file used to startup every component of rethink
                RewriteRule /(.*) http://172.18.0.4:4567/$1 [P,L]
    
                ProxyRequests On
    
                SSLEngine on
                SSLProxyEngine on
                SSLProtocol all -SSLv2 -SSLv3


                ProxyPass / http://172.18.0.4:4567/
                ProxyPassReverse / http://172.18.0.4:4567/
    
        </VirtualHost>
</IfModule>
```