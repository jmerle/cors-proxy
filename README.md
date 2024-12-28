# CORS Proxy

A CORS proxy based on Rob Wu's amazing [CORS Anywhere](https://github.com/Rob--W/cors-anywhere) that adds the following features on top of CORS Anywhere:
- Deployment with Docker
- Origin whitelist defined in an environment variable
- Privacy-friendly instrumentation with OpenTelemetry (visitor IPs and the full URLs that are being retrieved are never stored)

## Usage

Run the following command to start the proxy:
```
docker run --rm --name cors-proxy -p 8080:8080 jmerle/cors-proxy
```

This starts the CORS proxy on [http://localhost:8080/](http://localhost:8080/). The proxy can be configured using environment variables, see the [`.env.example`](./.env.example) file for the configurable options.
