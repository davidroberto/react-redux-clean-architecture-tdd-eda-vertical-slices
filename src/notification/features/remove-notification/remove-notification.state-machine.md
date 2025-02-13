```mermaid
---
title: Remove Notification State
---

flowchart TD
    A[
        Initial
        ---
            - Notifications list: notifications
    ]

    B[
        Notification Removed
        ---
            - Notifications list: notifications without deleted notification
    ]

A -->|Remove notification started|B

```