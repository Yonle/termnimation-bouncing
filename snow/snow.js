process.stderr.write("\x1B[?25l");
let rn = (rn) => Math.floor(Math.random() * 3) + 1;

function e() {
  let ps = {
    t: 0,
    l: 0,
    sp: {
      t: rn(),
      l: rn(),
    },
  };

  let ct = {
    t: 0,
    l: 0,
  };

  setInterval(() => {
    process.stdout.cursorTo(ps.l, ps.t);
    process.stdout.write(" ");
    if (ps.t >= process.stdout.rows - 1) ct.t = 1;
    else if (ps.t <= 0) ct.t = 0;

    if (ps.l >= process.stdout.columns - 1) ct.l = 1;
    else if (ps.l <= 0) ct.l = 0;

    if (ct.t) ps.t = ps.t - ps.sp.t;
    else ps.t = ps.t + ps.sp.t;

    if (ct.l) ps.l = ps.l - ps.sp.l;
    else ps.l = ps.l + ps.sp.l;

    process.stdout.cursorTo(ps.l, ps.t);
    process.stdout.write("*");
  }, Number(process.argv[3] || 50));
}

let bb = 0;
let int = setInterval(() => {
  if (bb >= Number(process.argv[2] || 15)) return clearInterval(int);
  e();
  bb++;
}, Number(process.argv[4] || 200));

process.on("SIGINT", () => {
  process.stderr.write("\x1B[?25h");
  console.clear();
  process.exit(0);
});

process.stdin.on('data', () => {
  console.clear();
  e();
});
