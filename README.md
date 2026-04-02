
# Splunk MCP Bridge

This project implements a Model Context Protocol (MCP) bridge that connects **Claude Desktop** to a **Splunk Management Endpoint**. It utilizes a custom-engineered Node.js JSON-RPC relay to bypass legacy protocol restrictions on Splunk Port 8089, enabling secure, real-time AI-driven log analysis.

## Project Overview

The core objective of this project is to transform Claude Desktop into a functional extension of the Splunk Search Head. By bridging these two platforms, users can perform complex data operations, such as multi-index correlative analysis and automated root-cause identification, using natural language instead of manual SPL coding.

## Key Features

-   **Custom Node.js Relay:** A bespoke JavaScript bridge (`splunk_mcp_bridge.mjs`) that refactors JSON-RPC requests from Claude into Splunk-compatible REST commands.
    
-   **Secure "Zero-Trust" Architecture:** Implements a hardened security perimeter using Nginx Proxy Manager for SSL/TLS termination and granular, zero-inheritance IAM roles (`mcp_user`).
    
-   **Encrypted Token Authentication:** Uses high-entropy encrypted audience tokens (scoped to `mcp`) to ensure only verified AI instances can access the data lake.
    
-   **Dockerized Deployment:** Both the Splunk Enterprise core and Nginx environment are containerized for consistent deployment and complete service isolation.
    

## System Architecture

The implementation consists of three primary environments:

1.  **Local Environment:** Hosts Claude Desktop and the Node.js bridge.
    
2.  **Network Perimeter:** Managed via Cloudflare DNS and Nginx Proxy Manager for secure HTTPS traffic.
    
3.  **Remote Cloud (DigitalOcean):** A high-performance Ubuntu droplet (8GB RAM, 160GB Disk) hosting the dockerized Splunk Enterprise core.
    

## Implementation Steps

### 1. Infrastructure Setup

-   Provision a high-performance Ubuntu droplet (DigitalOcean).
    
-   Deploy Docker and Portainer for container orchestration.
    
-   Initialize Splunk Enterprise as a stateless container with persistent storage mapping.
    

### 2. Splunk Configuration

-   Install the **Splunk MCP Server** and **Splunk AI Assistant for SPL** add-ons from Splunkbase.
    
-   Configure the `mcp_user` role with "Least Privilege" execution settings and zero inheritance.
    
-   Generate an **Encrypted Token** with the mandatory audience scope set to `mcp`.
    

### 3. Security & Networking

-   Deploy **Nginx Proxy Manager** to map the internal Docker network to a secure domain (e.g., `splunk.alcatrez.me`).
    
-   Enforce TLS 1.3 encryption for all transit data.
    

### 4. Client Integration

-   Configure Claude Desktop's `config.json` to launch the `splunk_mcp_bridge.mjs` relay.
    
-   Verify the handshake by confirming Claude recognizes the `splunk-mcp-server` connector.
    

## Future Works

-   **Proactive Alerting:** Configuring Claude to automatically monitor thresholds and provide instant root-cause analysis upon trigger events.
    
-   **Automated Remediation:** Granting "Write" capabilities to the bridge to allow for real-time threat blocking (e.g., updating firewall blacklists).
    
-   **Containerized Gateway:** Packaging the `.mjs` bridge as a sidecar service for easier enterprise-wide deployment.
