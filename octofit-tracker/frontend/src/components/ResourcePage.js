import { useEffect, useState } from 'react';

const getApiBaseUrl = () => {
  const codespaceName = process.env.REACT_APP_CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev/api`;
  }

  return 'http://localhost:8000/api';
};

const getEndpoint = (resourcePath) => `${getApiBaseUrl()}/${resourcePath}/`;

const normalizeItems = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

const formatValue = (value) => {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  if (Array.isArray(value)) {
    return value.length ? value.map((entry) => formatValue(entry)).join(', ') : 'None';
  }

  if (typeof value === 'object') {
    if (value.username) {
      return value.username;
    }

    if (value.name) {
      return value.name;
    }

    return JSON.stringify(value);
  }

  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  }

  return String(value);
};

const matchesQuery = (item, fields, query) => {
  if (!query) {
    return true;
  }

  const normalizedQuery = query.trim().toLowerCase();

  return fields.some((field) => formatValue(item[field.key]).toLowerCase().includes(normalizedQuery));
};

function ResourcePage({ title, description, resourcePath, emptyMessage, fields }) {
  const endpoint = getEndpoint(resourcePath);
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadItems = async () => {
      setIsLoading(true);
      setError('');

      try {
        console.log(`${title} endpoint:`, endpoint);
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const payload = await response.json();
        console.log(`${title} data:`, payload);

        if (isMounted) {
          setItems(normalizeItems(payload));
        }
      } catch (fetchError) {
        console.error(`${title} fetch error:`, fetchError);

        if (isMounted) {
          setError(fetchError.message);
          setItems([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadItems();

    return () => {
      isMounted = false;
    };
  }, [endpoint, title]);

  const filteredItems = items.filter((item) => matchesQuery(item, fields, query));
  const primaryField = fields[0];

  const handleRefresh = () => {
    setItems([]);
    setError('');
    setIsLoading(true);

    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        return response.json();
      })
      .then((payload) => {
        setItems(normalizeItems(payload));
      })
      .catch((fetchError) => {
        setError(fetchError.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <section className="resource-section card border-0 shadow-lg">
      <div className="card-body p-4">
        <div className="d-flex flex-column flex-lg-row justify-content-between align-items-lg-start gap-3 mb-4">
          <div>
            <p className="text-uppercase fw-semibold small text-success mb-2">Resource overview</p>
            <h2 className="h1 mb-2">{title}</h2>
            <p className="text-secondary mb-0">{description}</p>
          </div>

          <div className="resource-summary card border-0 shadow-sm">
            <div className="card-body py-3 px-4">
              <div className="text-uppercase small fw-semibold text-secondary mb-1">Records</div>
              <div className="display-6 fw-bold mb-0">{items.length}</div>
            </div>
          </div>
        </div>

        <div className="row g-3 align-items-end mb-4">
          <div className="col-lg-7">
            <label className="form-label fw-semibold" htmlFor={`${resourcePath}-search`}>
              Search {title.toLowerCase()}
            </label>
            <div className="input-group">
              <span className="input-group-text">Filter</span>
              <input
                id={`${resourcePath}-search`}
                className="form-control"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={`Search by ${fields.map((field) => field.label.toLowerCase()).join(', ')}`}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setQuery('')}
                disabled={!query}
              >
                Clear
              </button>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="card border-0 bg-light h-100">
              <div className="card-body d-flex flex-column flex-md-row gap-3 align-items-md-center justify-content-between">
                <div>
                  <h3 className="h6 mb-1">REST endpoint</h3>
                  <a className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href={endpoint} target="_blank" rel="noreferrer">
                    {endpoint}
                  </a>
                </div>
                <button type="button" className="btn btn-success" onClick={handleRefresh}>
                  Refresh data
                </button>
              </div>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="alert alert-info mb-0" role="status">
            Loading data from the REST API...
          </div>
        ) : null}

        {!isLoading && error ? (
          <div className="alert alert-danger mb-0" role="alert">
            Unable to load data: {error}
          </div>
        ) : null}

        {!isLoading && !error && !items.length ? (
          <div className="alert alert-warning mb-0" role="alert">
            {emptyMessage}
          </div>
        ) : null}

        {!isLoading && !error && items.length ? (
          <>
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
              <h3 className="h4 mb-0">{title} table</h3>
              <span className="badge text-bg-success-subtle border border-success-subtle text-success-emphasis rounded-pill px-3 py-2">
                Showing {filteredItems.length} of {items.length}
              </span>
            </div>

            {!filteredItems.length ? (
              <div className="alert alert-secondary mb-0" role="status">
                No records match the current search.
              </div>
            ) : (
              <div className="table-responsive resource-table-wrap">
                <table className="table table-striped table-hover align-middle mb-0 resource-table">
                  <thead className="table-dark">
                    <tr>
                      {fields.map((field) => (
                        <th scope="col" key={field.key}>
                          {field.label}
                        </th>
                      ))}
                      <th scope="col" className="text-end">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map((item, index) => (
                      <tr key={item.id ?? `${resourcePath}-${index}`}>
                        {fields.map((field) => (
                          <td key={field.key}>{formatValue(item[field.key])}</td>
                        ))}
                        <td className="text-end">
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={() => setSelectedItem(item)}
                          >
                            View details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        ) : null}

        {selectedItem ? (
          <>
            <div className="modal-backdrop fade show resource-modal-backdrop" onClick={() => setSelectedItem(null)} />
            <div
              aria-labelledby={`${resourcePath}-detail-title`}
              aria-modal="true"
              className="modal fade show d-block"
              role="dialog"
              tabIndex="-1"
            >
              <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content border-0 shadow-lg">
                  <div className="modal-header">
                    <div>
                      <p className="text-uppercase small fw-semibold text-success mb-1">{title} details</p>
                      <h4 className="modal-title h3 mb-0" id={`${resourcePath}-detail-title`}>
                        {formatValue(selectedItem[primaryField.key])}
                      </h4>
                    </div>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={() => setSelectedItem(null)}
                    />
                  </div>
                  <div className="modal-body">
                    <div className="card border-0 bg-light mb-3">
                      <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-2">
                        <div>
                          <h5 className="h6 mb-1">Source link</h5>
                          <a
                            className="link-success link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                            href={endpoint}
                            target="_blank"
                            rel="noreferrer"
                          >
                            Open {title.toLowerCase()} endpoint
                          </a>
                        </div>
                        <span className="badge rounded-pill text-bg-dark">
                          {resourcePath}
                        </span>
                      </div>
                    </div>

                    <div className="table-responsive">
                      <table className="table table-bordered align-middle mb-0">
                        <thead className="table-light">
                          <tr>
                            <th scope="col">Field</th>
                            <th scope="col">Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {fields.map((field) => (
                            <tr key={field.key}>
                              <th scope="row" className="w-25">{field.label}</th>
                              <td>{formatValue(selectedItem[field.key])}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-outline-secondary" onClick={() => setSelectedItem(null)}>
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}
      </div>
    </section>
  );
}

export default ResourcePage;