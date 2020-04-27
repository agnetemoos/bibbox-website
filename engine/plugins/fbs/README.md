# FBS plugin
Handles communication with FBS library system using the SIP2 protocol.

## Configuration
Required configuration from the "ctrl" plugin on the "config.fbs" event:

```javascript
{
  "username": "sip2",
  "password": "password",
  "endpoint": "https://ET.Cicero-fbs.com/rest/sip2/DK-761500",
  "agency": "DK-761500"
}
```

# Events

  * On
    * fbs.login => { username, password, busEvent }
      - Request login to verify a patron exists with the credentials.
    * fbs.library.status => { busEvent }
      - Get basic information about the library and what is supports.
    * fbs.patron => { username, password, busEvent }
      - All information about a give patron (inc. reservations, loans etc).
    * fbs.checkout => { username, password, itemIdentifier, busEvent }
      - Checkout (loan) item in the library system. Only different in response is the "ok" field: if '1' success else failure.
    * fbs.checkin => { itemIdentifier, busEvent }
      - Check-in (return) item.
    * fbs.renew => { username, password, itemIdentifier, busEvent }
      - Renew item in the library system.
    * fbs.renew.all => { username, password, busEvent }
      - Renew all the patrons loans.
    * fbs.block => { username, reason}
      - Block user in FBS.
    * fbs.online
      - Check that FBS is online.

  * Emit
    * fbs.err
      - Error event.
    * fbs.sip2.online
      - True if FBS is online else FALSE.


# Example usage

### Error handling.
```javascript
bus.on('fbs.err', function(err) {
  console.log(err);
});
```

### Login request
```javascript
bus.on('fbs.login.test', function(data) {
  if (data) {
    console.log('Valid');
  }
  else {
    console.log('Not valid');
  }
});
bus.emit('fbs.login', {
  'username': '12345567890',
  'password': '1234',
  'busEvent': 'fbs.login.test'
});
```
