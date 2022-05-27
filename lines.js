process.stderr.write("\x1B[?25l");
let ps = {
  t: 0,
  l: 0,
};

let ct = {
  t: 0,
  l: 0,
};

setInterval(() => {
  if (ps.t >= process.stdout.rows - 1) ct.t = 1;
  else if (ps.t <= 0) ct.t = 0;

  if (ps.l >= process.stdout.columns - 1) ct.l = 1;
  else if (ps.l <= 0) ct.l = 0;

  if (ct.t) ps.t--;
  else ps.t++;

  if (ct.l) ps.l--;
  else ps.l++;

  process.stdout.cursorTo(ps.l, ps.t);
  process.stdout.write("#");
}, Number(process.argv[2] || 70));

process.on("SIGINT", () => {
  process.stderr.write("\x1B[?25h");
  process.exit(0);
});
