export const strip0x = v => v.replace("0x", "");

export const truncateAddress = (address) => {
  const firstPart = address.slice(0, 4);
  const lastPart = address.slice(-4);

  return `0x${firstPart}...${lastPart}`
}

export const fromBase = (input, baseDecimals = 18, optionsInput) => {
  const base = BigInt("10") ** BigInt(baseDecimals)
  let baseValue = BigInt(input);
  const negative = baseValue < 0n;
  const baseLength = base.toString().length - 1 || 1;
  const options = optionsInput || {};

  if(negative) {
    baseValue = baseValue * BigInt(-1);
  }

  let fraction = (baseValue % base).toString(10);

  while(fraction.length < baseLength) {
    fraction = `0${fraction}`;
  }

  if(!options.pad) {
    fraction = fraction.match(/^([0-9]*[1-9]|0)(0*)/)[1];
  }

  let whole = (baseValue / base).toString(10);

  if(options.commify) {
    whole = whole.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  let value = `${whole}${fraction == '0' ? '' : `.${fraction}`}`;

  if(negative) {
    value = `-${value}`;
  }

  return value;
}
