import Button from "@/components/Button";
import Badge from "@/components/Badge";
import MenuItemCard from "@/components/MenuItemCard";
import { canteens } from "@/data/canteens";
import { menuItems } from "@/data/menu";

export default function HomePage() {
  const popular = menuItems.filter((item) => item.popular && item.available).slice(0, 4);

  return (
    <div className="flex flex-col gap-8">
      <section>
        <h1 className="mb-2 text-2xl font-bold">Pre-order canteen food and skip the queue</h1>
        <p className="mb-4 text-muted">
          Order from your campus canteen before the break and pick up your food when it&apos;s ready.
        </p>
        <Button href="/menu">Order now</Button>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">How it works</h2>
        <ol className="list-inside list-decimal">
          <li>Browse the menu.</li>
          <li>Add items to your cart and choose a pickup time.</li>
          <li>Collect your food when the order is ready.</li>
        </ol>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">Canteens</h2>
        <ul>
          {canteens.map((canteen) => (
            <li key={canteen.id} className="border-b border-border py-2">
              <span className="font-medium">{canteen.name}</span>{" "}
              <Badge color={canteen.isOpen ? "success" : "error"}>{canteen.isOpen ? "Open" : "Closed"}</Badge>
              <p className="text-sm text-muted">
                {canteen.location} · {canteen.timings}
              </p>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-2 text-lg font-bold">Popular items</h2>
        {popular.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </section>
    </div>
  );
}
