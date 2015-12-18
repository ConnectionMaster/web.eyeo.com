def stripindex(path):
  parts = path.split("/")
  if parts[-1] == "index":
    parts.pop()
  return "/".join(parts)
