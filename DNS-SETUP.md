# Custom Domain Setup Guide for Skyline Stream

## DNS Configuration

### If using your own domain registrar, add these DNS records:

#### Root Domain (skylinestream.com)
```
Type: A
Name: @
Value: 75.2.60.5
```

#### WWW Subdomain
```
Type: CNAME
Name: www
Value: [your-netlify-site-name].netlify.app
```

### Additional DNS Records (Optional)

#### Email Configuration (MX Records)
```
Type: MX
Name: @
Priority: 10
Value: mail.skylinestream.com
```

#### Security Records
```
Type: TXT
Name: @
Value: v=spf1 include:_spf.google.com ~all

Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:admin@skylinestream.com
```

## SSL Configuration

Netlify automatically provisions SSL certificates through Let's Encrypt. After adding your custom domain:

1. Wait for DNS propagation (can take up to 24 hours)
2. Netlify will automatically issue an SSL certificate
3. Force HTTPS will be enabled by default

## Verification Steps

1. Check DNS propagation: https://whatsmydns.net
2. Verify SSL: https://www.ssllabs.com/ssltest/
3. Test mail configuration: https://mxtoolbox.com/

## Support

For assistance, contact:
- Netlify Support: https://www.netlify.com/support/
- Domain Registrar Support
- EDH Productions Technical Team
