import { Card, CardContent } from "../ui/card";

const stats = [
  { label: "In queue", value: 8, sub: "tasks waiting" },
  { label: "Active", value: 1, sub: "in progress" },
  { label: "In review", value: 0, sub: "awaiting feedback" },
  { label: "Completed", value: 12, sub: "this month" },
];

export default function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {stats.map((s) => (
        <Card key={s.label} className="bg-muted/50">
          <CardContent className="p-4">
            <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
            <p className="text-2xl font-medium">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.sub}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
