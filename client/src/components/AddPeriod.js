import React, { useState } from "react";

function AddPeriod(){

    const [period, setPeriod] = useState(null);
    const [periodStartDate, setPeriodStartDate] = useState(null);
    const [periodEndDate, setPeriodEndDate] = useState(null);
    const [notes, setNotes] = useState(null)


    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        setIsLoading(true);
        fetch("/new_period", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            start_date,
            end_date
          }),
        }).then((r) => {
          setIsLoading(false);
          if (r.ok) {
            r.json().then((period) => setPeriod(period));
          } else {
            r.json().then((err) => setErrors(err.errors));
          }
        });
      }

      return (
        <form onSubmit={handleSubmit}>
            <div className="inputContainer">
                <Input
                    type="date"
                    id="period start date"
                    autoComplete="off"
                    value={periodStartDate}
                    onChange={(e) => setPeriodStartDate(e.target.value)}
            />
            </div>
            <div className="inputContainer">
                <Input
                    type="date"
                    id="period end date"
                    autoComplete="off"
                    value={periodEndDate}
                    onChange={(e) => setPeriodEndDate(e.target.value)}
                />
            </div>
            <div className="inputContainer">
                <Input
                    type="string"
                    id="notes"
                    autoComplete="off"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <Button type="submit">{"submit"}</Button>
          <FormField>
            {errors.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      );

}

export default AddPeriod;