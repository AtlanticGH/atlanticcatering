import { Link, useParams } from 'react-router-dom'
import { CollectionEditorLayout } from '@/cms/components/CollectionEditorLayout'
import { getCollectionById } from '@/cms/collections'
import { CollectionFormEditor } from '@/cms/editors'
import { useCollectionEditor } from '@/cms/hooks/useCollectionEditor'

function CollectionEditor({ collection }: { collection: NonNullable<ReturnType<typeof getCollectionById>> }) {
  const { data, setData, loading, saving, message, error, handleSave } = useCollectionEditor(collection)

  return (
    <CollectionEditorLayout
      collection={collection}
      loading={loading}
      saving={saving}
      message={message}
      error={error}
      onSave={handleSave}
    >
      {data !== null && !loading ? (
        <CollectionFormEditor
          key={`${collection.id}-loaded`}
          id={collection.id}
          value={data}
          onChange={setData}
        />
      ) : null}
    </CollectionEditorLayout>
  )
}

export function AdminCollectionPage() {
  const { id = '' } = useParams()
  const collection = getCollectionById(id)

  if (!collection) {
    return (
      <div className="rounded-2xl border border-acll-navy/[0.08] bg-white p-6 shadow-sm">
        <p className="text-[14px] text-red-600">Collection not found.</p>
        <Link
          to="/admin"
          className="mt-3 inline-block text-[14px] font-medium text-acll-navy hover:text-acll-green transition-colors"
        >
          ← Back to dashboard
        </Link>
      </div>
    )
  }

  return <CollectionEditor key={collection.id} collection={collection} />
}
