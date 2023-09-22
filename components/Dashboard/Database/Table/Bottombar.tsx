import { Database } from "@/models/Database/types"
import { Paginated } from "@/types/Api"
import { getTotalPages } from "@/utils/api"
import { Pagination, Selection } from "@nextui-org/react"

type Props = {
  selectedKeys: Selection
  databases?: Paginated<Database>
  onChangePage: (page: number) => void
}

export default function DatabaseTableBottombar({
  databases,
  selectedKeys,
  onChangePage,
}: Props) {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${databases?.data.length} selected`}
      </span>

      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={1}
        total={getTotalPages(
          databases?.meta.total ?? 0,
          databases?.meta.perPage ?? 0,
        )}
        onChange={onChangePage}
      />
    </div>
  )
}
