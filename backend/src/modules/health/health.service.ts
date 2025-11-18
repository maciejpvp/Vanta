export const checkServerStatus = (): { status: string; timestamp: string } => {
  return {
    status: "UP",
    timestamp: new Date().toISOString(),
  };
};
