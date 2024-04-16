import urlRegex from 'url-regex-safe';

export const rules = {
  highlight: /`((?:\\`|[^`])+)`/gi,
  reference: /\$([A-Za-z][A-Za-z0-9-_]*)/gi,
  url: urlRegex({ localhost: false, ipv4: false, ipv6: false, strict: true }),
};
