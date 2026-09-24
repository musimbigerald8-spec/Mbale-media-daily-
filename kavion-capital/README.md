# Kavion Capital

Kavion Capital is the working name for the new investment-platform project.

## Current build

This repository contains the initial production-oriented web interface:

- Public landing page
- Investor portal
- Portfolio/transaction views
- KYC status area
- Compliance and funding-state notices
- Mobile responsive layout

## Real-money activation

The static site must not be treated as a live deposit-taking or investment service. Before accepting public funds, the project needs an appropriate legal operating entity, applicable CMA authorization/partner arrangement, payment-system authorization or licensed payment provider, KYC/AML controls, custody/segregation arrangements, server-side authentication, a double-entry financial ledger, reconciliation, audit logs, security monitoring and production infrastructure.

The frontend deliberately keeps funding disabled until those controls are implemented.

## Suggested production architecture

Frontend -> authenticated API -> KYC/AML service -> investment/fund-management partner -> custodian/payment provider -> immutable transaction ledger -> investor reporting.

Never store payment credentials, private keys or authoritative balances in browser JavaScript or localStorage.

## Naming

"Kavion Capital" is a working product name only. A formal company/trademark/domain clearance should be completed before public launch.
