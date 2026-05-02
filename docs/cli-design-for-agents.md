# CLI Design for Agents

Design CLI interfaces so agents can execute correctly on first try:

- Keep command grammar strict and explicit (`tool verb noun`).
- Avoid hidden defaults for onboarding-critical fields.
- Return machine-readable or stable human-readable output.
- On failure, print corrective next-step hints.
- Show required file outputs after scaffold/init commands.
- Ensure command examples in docs are copy/paste complete.
